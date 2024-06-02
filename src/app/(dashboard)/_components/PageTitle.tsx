import AnimateTitleLeftToRight from "@/animations/AnimateTitleLeftToRight";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <AnimateTitleLeftToRight>{title}</AnimateTitleLeftToRight>;
};

export default PageTitle;
