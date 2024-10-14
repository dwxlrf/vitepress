import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress/',
  title: "dwx",
  description: "学而不思则罔",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '汇总', link: '/分布式消息框架RabbitMQ-.md' }
    ],

    sidebar: [
      {
        text: '汇总',
        items: [
          { text: '10.14作业', link: '/分布式消息框架RabbitMQ-.md' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
