import { create } from 'zustand';

interface InquiryResult {
    fullName: string;
    nearestBranchInfo: string;
    branchDetails: {
        name: string;
        address: string;
        landline: string;
        googleMapsUrl: string;
        landingPageUrl: string;
    };
}

interface InquiryResultState {
    inquiryResult: InquiryResult | null;
    setInquiryResult: (result: InquiryResult) => void;
}

const useInquiryResultStore = create<InquiryResultState>((set) => ({
  inquiryResult: null,
  setInquiryResult: (result: InquiryResult) => set({ inquiryResult: result }),
}));

export default useInquiryResultStore;