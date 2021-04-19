import axios from "axios";

async function getData(district) {
  let cmsData = [];

  // Make sure that the district passed through is valid
  if (district <= 0 || district > 12 || !district) {
    return [];
  }

  // Get CMS data
  const cmsDataReq = await axios({
    method: "get",
    url: `https://cwwp2.dot.ca.gov/data/d${district}/cms/cmsStatusD${String(district).padStart(2, '0')}.json`
  }).catch(e => {
    console.log(e);

    return { data: null }
  });

  if (cmsDataReq.data) {
    return cmsDataReq.data.data;
  }

  return [];
}

export default async (req, res) => {

  const cmsData = await getData(req.query.district);

  // Remove inactive or out of service signs
  const inServiceSigns = cmsData.filter(signData => {
    if ((signData.cms.inService === "true" || signData.cms.inService === "True") && signData.cms.message.display !== "Blank" && signData.cms.message.display !== "Not Reported") {
      return signData;
    }
  });

  res.status(200).json(inServiceSigns)
}
