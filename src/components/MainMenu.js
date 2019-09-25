import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styled from "styled-components";
import SiteInfo from "./SiteInfo";

const MainMenuWrapper = styled.div`
  display: flex;
  background-color: rgb(3, 27, 77);
`;

const MainMenuInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  width: 960px;
  height: 100%;
`;

const MenuItem = styled(Link)`
  color: white;
  display: block;
  padding: 8px 16px;
`;

const MainMenu = () => {
  const { allWordpressWpApiMenusMenusItems: menus } = useStaticQuery(graphql`
    query {
      allWordpressWpApiMenusMenusItems(filter: { name: { eq: "Main menu" } }) {
        edges {
          node {
            items {
              title
              object_slug
            }
          }
        }
      }
    }
  `);
  return (
    <MainMenuWrapper>
      <MainMenuInner>
        <SiteInfo />
        {menus.edges[0].node.items.map(item => (
          <MenuItem to={item.object_slug} key={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </MainMenuInner>
    </MainMenuWrapper>
  );
};

export default MainMenu;
