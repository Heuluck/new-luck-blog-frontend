import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Head from "../layouts/HeadDefault.js";
import Layout from "../layouts/3D/Layout";

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "Heuluck的新博客",
  extends: vikeReact,
  passToClient: [
    'user'
  ]
} satisfies Config;
