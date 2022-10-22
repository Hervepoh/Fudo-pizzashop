import sanityClient  from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";

export const client = sanityClient({
	projectId : "1jmf88ov",
	dataset    : "production",
	apiVersion : "2022-07-27",
	useCdn : true,
	token : "skn6F5FEF7P1fCFGfSn6rZlycKXnFGufWP4LKRxpjM0bCEVFyeSBzYki65aAEKlenuCDitL2wdDUJgrXv41qQCEWGpDj0jzIVV23ViIy9DlEy6aNBnLgMz7kE3lZJyaUbjWPIT2RtfDPr8yKpBGEOFnyLNL0ERkLog58Ku1mqQazzdt67kPY",
}) 


const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)