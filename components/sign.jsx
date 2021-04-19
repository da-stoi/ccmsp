import { IconButton } from "@material-ui/core";
import { LocationOnRounded } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SignWrapper = styled.div`
  margin: 5px;
  display: block;
  positions: absolute;
`

const SignLines = styled.div`
  background-color: black;
  padding: 5px;
  width: 360px;
  height: 135px;
`

const SignDataText = styled.h1`
  color: white;
  font-family: "Arial";
  margin: 10px;
  font-size: 25px;
`

const SignText = styled.h1`
  color: orange;
  font-family: "Ticker";
  margin: 10px;
  font-size: 28px;
`

export default function Sign({ cmsData }) {

  const [currentPhase, setCurrentPhase] = useState(1);
  const multiPhase = cmsData.cms.message.display.startsWith("2") ? true : false;
  const textLength = cmsData.cms.location.route.length + cmsData.cms.location.direction.length + cmsData.cms.location.county.length + 11;

  // Animate 2-phase signs
  useEffect(() => {
    if (multiPhase) {
      setTimeout(() => {
        setCurrentPhase(currentPhase === 1 ? 2 : 1);
      }, 2000)
    }
  }, [currentPhase])

  return (<SignWrapper>
    <IconButton onClick={() => window.open(`https://duckduckgo.com/?q=${cmsData.cms.location.latitude},${cmsData.cms.location.longitude}&iaxm=maps`, "_blank")}><LocationOnRounded /></IconButton><SignDataText style={{ fontSize: textLength > 23 ? 25 / (textLength / 23) : "25px", lineHeight: "20px", display: "inline" }}>{cmsData.cms.location.route} {cmsData.cms.location.direction} | {cmsData.cms.location.county} County</SignDataText>
    <SignLines>
      <SignText>{cmsData.cms.message[`phase${currentPhase}`][`phase${currentPhase}Line1`]}</SignText>
      <SignText>{cmsData.cms.message[`phase${currentPhase}`][`phase${currentPhase}Line2`]}</SignText>
      <SignText>{cmsData.cms.message[`phase${currentPhase}`][`phase${currentPhase}Line3`]}</SignText>
    </SignLines>
  </SignWrapper>)

}