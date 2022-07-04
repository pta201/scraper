const axios = require("axios").default;
const cheerio = require("cheerio");
const { headers } = require("../../../web/next.config");

const getIDs = (html) => {
  let IDs = [];
  let $ = cheerio.load(html);
  $(".shop-search-result-view__item").each((index, elem) => {
    //Lấy link sp
    let url = $(elem).children("a")[0].attribs.href;
    //Lấy shopId và productId từ link sp
    let ids = url.split("?")[0].match(/\d+/g).slice(-2);
    const info = {
      shopId: ids[0],
      productId: ids[1],
    };
    IDs.push(info);
  });
  return IDs;
};
const generateUrls = (IDs) => {
  const urls = IDs.map((info) => {
    return `https://shopee.vn/api/v4/item/get?itemid=${info.productId}&shopid=${info.shopId}`;
  });
  return urls;
};

const getProductsData = async (html) => {
  const IDs = getIDs(html);
  const URLs = generateUrls(IDs);
  const products = await callApi(URLs);
  return products;
};

const callApi = async (URLs) => {
  console.log("Calling APIS");
  try {
    const products = [];
    const config = {
      headers: {
        Browser: "Chrome/102.0.5005.115",
        "Protocol-Version": "1.3",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        "sec-ch-ua-platform": "Windows",
        accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
        cookie: `REC_T_ID=e554f741-cd10-11ec-b940-b47af14b47cc; G_ENABLED_IDPS=google; SPC_F=144Nx0HbyoXnyJv1fnyJ3suFyrjtl3Xs; REC_T_ID=5f45bfc2-d3fd-11ec-a30b-923133c4ad2a; SC_DFP=2Gfvxp9jNFUSbVoJol5Q8cUFXQIdROcz; SPC_CLIENTID=MTQ0TngwSGJ5b1huiwrslgghyvzhqqrl; SPC_ST=.VUR2NzBaeHQ3dXRla3M3SZWfNkinaBzfi/m6Ku5dmqWAaDKR7qj/OKPOwEqVCy5QaatbMH+YpdsB8+5f4eO4iQteQXw3W8vLeOxVmTIG0dDhF6lUbnQACbGhSAOIKbu0J+jZi5vFjQwhxQviy4fmSdUQONQia8nwELxhr7fenFg1/bYe8g1yxXzgSyDBrThaSmmyNkzd7/9SzqGoVlw3BQ==; SPC_U=26438394; __LOCALE__null=VN; csrftoken=97ZS298uQWsLfkbr1udoIFm2qpT0zpli; SPC_T_IV="hh4c6ltVrNNKKq4I+LaROA=="; SPC_T_ID="aq1UkXGqMMNxd8Q0UKz3KuKu9hBxX21d+4yrexiuRh4Xz/3XPbHnCCLEyIOIkU9i3o/0dFcxXo4QvCSR08MddcD5siHKjgkZtZEP9s5Byf0="; SPC_R_T_ID=aq1UkXGqMMNxd8Q0UKz3KuKu9hBxX21d+4yrexiuRh4Xz/3XPbHnCCLEyIOIkU9i3o/0dFcxXo4QvCSR08MddcD5siHKjgkZtZEP9s5Byf0=; SPC_R_T_IV=hh4c6ltVrNNKKq4I+LaROA==; SPC_T_ID=aq1UkXGqMMNxd8Q0UKz3KuKu9hBxX21d+4yrexiuRh4Xz/3XPbHnCCLEyIOIkU9i3o/0dFcxXo4QvCSR08MddcD5siHKjgkZtZEP9s5Byf0=; SPC_T_IV=hh4c6ltVrNNKKq4I+LaROA==; SPC_SI=KQy8YgAAAABCUnpYcDJDeY6LLQAAAAAAYVJpcWNsWXo=; _QPWSDCXHZQA=ab4ee087-69af-49eb-ba6e-846fc1efeb6e; SPC_IA=1; shopee_webUnique_ccd=szJL+/v32rjWkUXNY9RlGQ==|+X9oQFaR/D49y+M/DU1MS0KuiNWW3GVUIFv25WTOXASrFGLRLiAJ80CnlqGP/+Y8E1XoQOj38pvu94Njnr8njP3t|iBy6A+DxUYbI5qPn|05|3; SPC_EC=OGhFdDdDRDFvWXZ0REFxWtrcjmxRPaYHjBzOUQ2uOHF8yYpPC/slMrn8/ZzKOO6JW9p/8OFnpIYRuYQak225+EMR70kjNLvGjOQzOL1UAd/FWnnBX9KxBWZzy3ZY1sfeWwyN5h9R8X4AG7q10ZATRji33T/wjFD9uFUG1rGQh44=`,
      },
    };
    const promises = URLs.map((url) => {
      return axios.get(url, config);
    });
    // console.log("Called! Waiting for promises");
    await Promise.allSettled(promises)
      .then((result) => {
        for (let i = 0; i < result.length - 1; i++) {
          products.push(xulyData(result[i].value.data.data));
        }
        // headers
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(products.length);
    return products;
  } catch (err) {
    console.error(err.message);
  }
};

const xulyData = (data) => {
  product = {
    itemId: data.itemid,
    shopId: data.shopid,
    name: data.name,
    image: `https://cf.shopee.vn/file/${data.image}`,
    priceRange: {
      priceMin: data.price_min / 100000,
      priceMax: data.price_max / 100000,
    },

    totalSales: data.historical_sold,
    salesPerMonth: data.sold,
  };
  return product;
};

module.exports.getProductsData = getProductsData;
