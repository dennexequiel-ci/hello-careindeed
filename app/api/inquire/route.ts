import findNearestBranch from '@/utils/findNearestBranch';

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data from the request
    const formData = await req.json();
    const webhookSinkId = process.env.WEBHOOK_SINK_ID;

    if (!webhookSinkId) {
      console.error('Webhook sink ID is not defined');
      return new Response(
        JSON.stringify({
          error: 'Internal server error: Configuration missing',
        }),
        { status: 500 }
      );
    }

    // Construct the URL for the webhook using an environment variable for the sink ID
    const webhookUrl = `https://webhook.site/${webhookSinkId}`;

    // Send the form data to the webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if the webhook response is not successful
    if (!webhookResponse.ok) {
      console.error(
        `Failed to send data to webhook: ${webhookResponse.statusText}`
      );
      return new Response(
        JSON.stringify({
          error:
            'Failed to send data to the external service. Please try again later.',
        }),
        { status: 502 }
      );
    }

    // Determine the nearest branch based on the user's zip code
    const nearestBranch = findNearestBranch(formData.zipCode);

    // Generate a message listing the available staffing types
    let availableStaffingTypesMessage = '';
    const staffingTypesCount = formData.staffingTypes.length;

    if (staffingTypesCount === 1) {
      availableStaffingTypesMessage = formData.staffingTypes[0];
    } else if (staffingTypesCount > 1) {
      availableStaffingTypesMessage =
        formData.staffingTypes.slice(0, -1).join(', ') +
        ` and ${formData.staffingTypes[staffingTypesCount - 1]}`;
    }

    // Prepare the response data to be sent back to the client
    const responsePayload = {
      fullName: `${formData.firstName} ${formData.lastName}`,
      nearestBranchInfo: `We have ${availableStaffingTypesMessage} available for you in our ${nearestBranch?.name} branch.`,
      branchDetails: {
        name: nearestBranch?.name,
        address: nearestBranch?.address,
        landline: nearestBranch?.landline,
        googleMapsUrl: nearestBranch?.googleMapsUrl,
        landingPageUrl: nearestBranch?.landingPageUrl,
      },
    };

    // Send the response back to the client
    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error handling form submission:', error);

    let errorMessage =
      'An unexpected error occurred while processing your request. Please try again later.';
    let status = 500;

    // Determine if it's a client error or a server error
    if (error instanceof SyntaxError) {
      errorMessage =
        'Invalid JSON in request body. Please check your input and try again.';
      status = 400;
    } else if (error instanceof Error) {
      // Handle other types of errors if needed
      errorMessage = error.message;
    }

    // Send a more specific error response back to the client
    return new Response(JSON.stringify({ error: errorMessage }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
