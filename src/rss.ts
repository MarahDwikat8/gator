import {XMLParser} from "fast-xml-parser";

export type RSSFeed ={
channel:{
    title:string;
    link:string;
    description:string;
    item: RSSItem[];

};
};

export  type RSSItem={
    titel:string ;
    link:string ;
    description:string;
    pubDate:string ;
};

export async function fetchFeed(feedURL:string):Promise<RSSFeed>{
    const response = await fetch(feedURL,{
        headers:{
            "User-Agent": "gator",//بيحكي للسيرفر مين انا 
        },
    });

    if (!response.ok){
        throw new Error (
            `Failed to fetch feed: ${response.status} ${response.statusText}`,
        );
    }
    const xml = await response.text();// رح يكون تيكست مش جيسون لانه من اكس ام ال 
    const parser = new XMLParser({processEntities:false});//Entities رموز صعب نفكها بالتالي ما بدي اياها 
    const parsed =parser.parse(xml);

    const channel = parsed?.rss?.channel;//بفحص انا عندي اذا جاب من الشانيل او لا 
    if (!channel) {
    throw new Error("Could not find channel in RSS feed");
  }
      if (//بفحص التايب تبع الشانيل لازم يكون مطابق 
    typeof channel.title !== "string" ||
    typeof channel.link !== "string" ||
    typeof channel.description !== "string"
  ) {
    throw new Error("Channel is missing required metadata");
  }
  //أصعب جزء: item ممكن يكون أوبجكت أو مصفوفة!
  let rawItems : any[]=[];//نوعها مصفوفه 
  if(Array.isArray(channel.item)){//اذا كانت مصفوفه 
    rawItems=channel.item;
  }
  else if (channel.item){
    rawItems=[channel.item];//حطلي اياها كاوبجكت في الرو 
  }// يعني لازم تكون عنصرين او اكتر حتى تكون مصفوفه 
    
   const items: RSSItem[] = [];

  for (const rawItem of rawItems) {
    if (
      typeof rawItem.title !== "string" ||
      typeof rawItem.link !== "string" ||
      typeof rawItem.description !== "string" ||
      typeof rawItem.pubDate !== "string"
    ) {
      continue;
    };//افحصلي اذا كل ايتيم هو عباره عن اوبجكت 
    

     items.push({
      titel: rawItem.title,
      link: rawItem.link,
      description: rawItem.description,
      pubDate: rawItem.pubDate,
    }); //بده يحط يضيف الداتا

  }

  return {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: items,
    },
  };
  
}