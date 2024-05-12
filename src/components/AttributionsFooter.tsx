import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface HasAttribution {
  href: string;
  hrefString: string;
  additionalText?: string;
}

const AttributionsFooter = () => {
  const attributionList: HasAttribution[] = [
    {
      hrefString: "Image by vectorjuice",
      href: "https://www.freepik.com/free-vector/doctors-personalized-prescriptive-analytics_11667703.htm#fromView=search&page=3&position=27&uuid=c2a7f059-5fed-4ece-a217-92e9507dce02",
      additionalText: "onFreepik",
    },
  ];
  return (
    <Accordion className="bg-violet-500 text-white" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="p-1">Image Attributions</AccordionTrigger>
        <AccordionContent className="p-2">
          <ul className="list-disc">
            {attributionList.map((item) => {
              return (
                <li>
                  <Link className="underline" href={item.href}>
                    {item.hrefString}
                  </Link>{" "}
                  {item.additionalText}
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AttributionsFooter;
