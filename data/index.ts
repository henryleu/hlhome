import type { PageParams } from '~/types/page'

export const siteData = {
  url: 'https://blog.henryleu.pages.dev',
  title: '猩空',
  description:
    '个人博客网站，分享一些关于软件开发相关的文章，话题包括编程语言、技术架构、人工智能、云计算、边缘计算、以及一些前沿技术的思考和探索。',
  twitterHandle: '@henry_leu',
  mailAddress: 'honglileu@gmail.com',
  image:
    'https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp',
}
export const authorData = {
  name: 'Henry Leu',
  description:
    '技术爱好者，软件架构师，创业者。喜欢健身、历史和军事。预祝中国登月成功，那天我们一起弹冠相庆，见证历史。',
  image: '/xingkong.webp',
  connect:
    '技术美学强迫症中晚期，喜欢探索技术背后的数理逻辑。拒绝阴谋论和认知失调，希望和你交流探讨，一起认知升级。',
  email: 'honglileu@gmail.com',
  twitter: 'https://x.com/henry_leu',
  github: 'https://github.com/henryleu',
  stackoverflow: 'https://stackoverflow.com/users/2118405/henry-leu',
}

export const defaultPageParams: PageParams = {
  path: '',
  title: siteData.title,
  description: siteData.description,
  image: siteData.image,
  ogImage: siteData.image,
  ogTitle: siteData.title,
}

export const navbarData = {
  title: siteData.title,
}

export const footerData = {
  author: authorData.name,
  aboutAuthor:
    '你好，我是 henry，一个资深软件架构师和连续创业者。喜欢健身和政经评论。希望和大家一起探讨计算机和其他领域的科技美学。',
  aboutTheSite:
    '个人博客，基于 Nuxt3, NuxtContent, TailwindCSS 技术和 Cloudflare 服务构建。托管在 Cloudflare 上。代码开源，欢迎克隆。',
}

export const homePage = {
  title: '欢迎阅读',
  description:
    '这是一个 IT 老兵的个人博客。包括一些关于软件开发、架构设计、人工智能、云计算、边缘计算，以及前沿科技的探索和思考。偶尔一点键政评论。',
  image: '/xingkong.webp',
}

export const blogsPage = {
  title: '所有博客',
  description: '这里收录了我的所有博客。',
}

export const tagsPage = {
  title: '所有标签',
  description: '这里收录了我博客中的所有标签。',
}

export const aboutPage = {
  title: authorData.name,
  description: authorData.description,
  image: authorData.image,
  aboutAuthor: footerData.aboutAuthor,
}
