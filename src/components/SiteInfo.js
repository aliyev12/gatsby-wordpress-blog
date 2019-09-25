import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

const SiteInfoWrapper = styled.div`
  flex-grow: 1;
  color: white;
  margin: auto 0;
`;

const SiteTitle = styled.div`
  font-weight: bold;
`;

const SiteInfo = ({ meta }) => {
  const { allWordpressSiteMetadata: metaData } = useStaticQuery(graphql`
    query {
      allWordpressSiteMetadata {
        edges {
          node {
            name
            description
          }
        }
      }
    }
  `);
  return (
    <SiteInfoWrapper>
      <SiteTitle>{metaData.edges[0].node.name}</SiteTitle>
      <div>{metaData.edges[0].node.description}</div>
    </SiteInfoWrapper>
  );
};

export default SiteInfo;
