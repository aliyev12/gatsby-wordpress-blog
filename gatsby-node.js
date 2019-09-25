const path = require(`path`);
const slash = require(`slash`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  createRedirect({
    fromPath: "/",
    toPath: "/home",
    redirectInBrowser: true,
    isPermanent: true,
  });

  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            path
            status
            template
            title
            content
          }
        }
      }
      allWordpressWpPortfolio {
        edges {
          node {
            id
            slug
            path
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

  if (result.errors) {
    throw new Error(result.errors);
  }

  const { allWordpressPage, allWordpressWpPortfolio } = result.data;
  const pageTemplate = path.resolve(`./src/templates/page.js`);
  const portfolioUnderTemplate = path.resolve(`./src/templates/portfolioUnderContent.js`);
  
  allWordpressPage.edges.forEach(edge => {
    createPage({
      path: edge.node.path,
      component: slash(edge.node.template === 'portfolio_under_content.php' ? portfolioUnderTemplate : pageTemplate),
      context: {
        id: edge.node.id,
        pagePath: edge.node.path,
        status: edge.node.status,
        template: edge.node.template,
        format: edge.node.format,
        title: edge.node.title,
        content: edge.node.content,
      },
    });
  });

  const portfolioTemplate = path.resolve(`./src/templates/portfolio.js`);
  allWordpressWpPortfolio.edges.forEach(edge => {
    createPage({
      path: edge.node.path,
      component: slash(portfolioTemplate),
      context: {
        id: edge.node.id,
        portfolioPath: edge.node.path,
        slug: edge.node.id,
        title: edge.node.title,
        excerpt: edge.node.excerpt,
        content: edge.node.content,
        featured_media: edge.node.featured_media,
        source_url: edge.node.source_url,
      },
    });
  });
};
