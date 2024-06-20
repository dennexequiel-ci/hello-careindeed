import findNearestBranch from '@/utils/findNearestBranch';

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data from the request
    const formData = await req.json();

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
