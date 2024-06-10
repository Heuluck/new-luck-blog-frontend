import Layout from "@layouts/dashboard/Layout";


export default {
    // The <Layout> of all admin pages (overriding the default set by /pages/+config.js)
    Layout,
    passToClient: [
      'headers'
    ]
  }