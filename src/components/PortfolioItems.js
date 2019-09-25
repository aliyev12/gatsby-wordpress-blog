import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";

const PortfolioItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PortfolioItem = styled.div`
  width: 300px;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
`;

const PortfolioImage = styled.img`
  max-width: 100%;
`;

const PortfolioItems = () => {
  const { allWordpressWpPortfolio: portfolio } = useStaticQuery(graphql`
    query {
      allWordpressWpPortfolio {
        edges {
          node {
            id
            slug
            title
            excerpt
            content
            featured_media {
              source_url
            }
          }
        }
      }
    }
  `);
  return (
    <PortfolioItemsWrapper>
      {portfolio.edges.map(portfolioItem => (
        <PortfolioItem key={portfolioItem.node.id}>
          <h2>{portfolioItem.node.title}</h2>
          <PortfolioImage
            src={portfolioItem.node.featured_media.source_url}
            alt={portfolioItem.node.title}
          />
          <div
            dangerouslySetInnerHTML={{ __html: portfolioItem.node.excerpt }}
          />
          <Link to={`/portfolio/${portfolioItem.node.slug}`}>Read More</Link>
        </PortfolioItem>
      ))}
    </PortfolioItemsWrapper>
  );
};

export default PortfolioItems;
