import { CircularProgress, createMuiTheme, Divider, FormControl, InputLabel, Link, MenuItem, Select, ThemeProvider, Typography } from '@material-ui/core'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sign from '../components/sign'
import styles from '../styles/Home.module.css'

const SignsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Header = styled.div`
  color: white;
  width: 100%;
  max-width: 800px;
  text-align: center;
`

export default function Home() {

  const [district, updateDistrict] = useState(1);
  const [searching, setSearching] = useState(false);
  const [cmsData, setCmsData] = useState([]);

  useEffect(async () => {
    // Display loading animation and clear previous CMS data
    setSearching(true);
    setCmsData([]);

    // Get CMS data
    const cmsDataReq = await axios({
      method: "get",
      url: `./api/getStats?district=${district}`
    });

    // Set CMS data
    if (cmsDataReq.data) {
      setCmsData(cmsDataReq.data);
    }

    // Stop loading animation
    setSearching(false);
  }, [district]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#90caf9",
        light: "rgb(166, 212, 250)",
        dark: "rgb(100, 141, 174)",
        contrastText: "rgba(0, 0, 0, 0.87)"
      },
      type: "dark",
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>CCMSP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Header>
          <Typography variant="h3">California CMS Preview</Typography>
          <Typography variant="subtitle1">Displays the live messages of all the changeable message signs on California's highways.</Typography>
          <Typography variant="subtitle1">Don't forget to check out the <Link href="https://daniel.stoiber.network/project/ccmsp">project page on my website</Link> to learn more about this project. If you want to see the code you can check it out on <Link href="https://github.com/da-stoi/ccmsp">GitHub</Link>.</Typography>
          <br />
          <Divider />
          <br />
          <FormControl fullWidth variant="outlined" style={{ maxWidth: "300px", textAlign: "left" }}>
            <InputLabel htmlFor="district">District</InputLabel>
            <Select
              labelId="district"
              id="district"
              value={district}
              onChange={e => updateDistrict(e.target.value)}
              labelWidth={54}
            >
              <MenuItem value="1">District 1</MenuItem>
              <MenuItem value="2">District 2</MenuItem>
              <MenuItem value="3">District 3</MenuItem>
              <MenuItem value="4">District 4</MenuItem>
              <MenuItem value="5">District 5</MenuItem>
              <MenuItem value="6">District 6</MenuItem>
              <MenuItem value="7">District 7</MenuItem>
              <MenuItem value="8">District 8</MenuItem>
              <MenuItem value="9">District 9</MenuItem>
              <MenuItem value="10">District 10</MenuItem>
              <MenuItem value="11">District 11</MenuItem>
              <MenuItem value="12">District 12</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <Link href="https://cwwp2.dot.ca.gov/documentation/district-map-county-chart.htm">Caltrans District Map</Link>
        </Header>
        <br />
        <Divider style={{ width: "100%" }} />
        <br />
        <SignsWrapper>
          {cmsData?.length ? (
            cmsData.map(signData => {
              return <Sign cmsData={signData} />
            })
          ) : searching ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" style={{ color: "white" }}>No active changeable message signs found :(</Typography>
          )}
        </SignsWrapper>
      </ThemeProvider>
    </div>
  )
}
