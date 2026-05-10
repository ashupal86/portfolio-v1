import { codeToHtml } from 'shiki';

export async function Code({ children, className, ...props }: any) {
  const language = className?.replace(/language-/, '') || 'text';
  const html = await codeToHtml(children.trim(), {
    lang: language,
    theme: 'github-dark',
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} className="shiki-wrapper" />;
}

export const mdxComponents = {
  code: Code,
};
