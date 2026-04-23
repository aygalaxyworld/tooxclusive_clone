import Image from "next/image";
import Link from "next/link";
import MediumCard from "./components/MediumCard";
import Card from "./components/Card";
import DescriptiveCard from "./components/DescriptiveCard"; 
import BulletLink from "./components/BulletLink";
import CalloutCard from "./components/CalloutCard";
import { getLatestReleases } from "./lib/music-api";
 
export default async function Home() {
  const releases = await getLatestReleases();
  const heroReleases = releases.slice(0, 2);
  const latestReleaseCards = releases.slice(2, 11);

  return (
    <main className="container mx-auto px-1 py-1 lg:min-w-fit max-w-full">
      <section className="mx-3 my-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h2 className="text-lg font-bold">Live Music Releases (Auto-updated every 30 minutes)</h2>
        <p className="mt-1 text-sm text-zinc-600">
          This section pulls artwork, titles, and links directly from a free music API so new releases can surface automatically.
        </p>
      </section>
      {/* hot Session */}
      <section id="hot" className="mx-3 grid grid-cols-1 my-5 md:grid-cols-3 gap-4">
        {/* Left side of the hot section */}
        <article className="bg-white overflow-hidden mb-5">
          {/*Icon and Text*/}
          <h3 className="flex items-center text-base font-bold mb-7">
            <span className="mr-2 text-black underline">
              <i className="fas fa-fire"></i>
            </span>
            <span className="relative">
              Afrobeats Album to Expect in 2025
              <span className="absolute ml-12 mb-2 bottom-0.5 left-60 w-40 h-0.5 bg-customGray"></span>
            </span>
          </h3>
          {/* Image Section 1*/}
          <div className="relative w-full ">
            <Link href={"/Artist"}>
              <Image
                src="/WhatsApp-Image-2024-12-05-at-20.17.13.jpeg"
                alt="Davido Album"
                layout="responsive"
                width={500}
                height={488}
                priority
              
              />
            </Link>
          </div>
          <div className="flex items-center w-full">
            {/* Line Separator */}
            <div className="flex mt-7 mb-3 h-px bg-customGray min-w-[100%]"></div>
          </div>
          {/* Bottom Left side HOT Section */}
          <h3 className="flex relative item-left text-bold mt-6 py-1 border-b-2 mb-5">HOTTTTTT <span className="absolute left-0 inset-8 bottom-0 w-8 h-0.5 bg-red-600"></span></h3> 
           
          <CalloutCard
            imageUrl="/2-4-350x250.webp"
            imageAlt="Pryme Enlists Chike for the Remix of His Trending Hit, 'Carry Go'"
            category="GOSPEL"
            title="Emmanuel - Abimbola Koleosho"
            author="Duncan"
            authorUrl="https://tooxclusive.com/author/batimoore/"
            postUrl="https://tooxclusive.com/gospel/video-emmanueli-abimbola-koleosho/"
            date="Dec 31, 2024 | 18:06"
          />
     </article>

        {/* Right side of the hot section */}
        <article className="col-span-3 md:col-span-2 p-2 bg-white overflow-hidden ">
          <div className="flex flex-col w-full space-y-5 my-auto md:space-x-6 md:flex-row md:space-y-0">

           <Card
              width= "w-full md:w-1/2"
              href = {heroReleases[0]?.link ?? "https://music.apple.com"}
              src= {heroReleases[0]?.artwork ?? "/WhatsApp-Image-2024-11-08-at-22.54.24-350x250.jpeg"}
              alt= {heroReleases[0]?.title ?? "Latest release"}
              title= {heroReleases[0] ? `${heroReleases[0].artist} — ${heroReleases[0].title}` : "Latest Afrobeats release"}
              date= {heroReleases[0] ? new Date(heroReleases[0].releaseDate).toLocaleDateString() : "Live API"}
              />
           <Card
              width="w-full md:w-1/2"
              href = {heroReleases[1]?.link ?? "https://music.apple.com"}
              src= {heroReleases[1]?.artwork ?? "/Joeboy-350x250.webp"}
              alt= {heroReleases[1]?.title ?? "Latest release"}
              title= {heroReleases[1] ? `${heroReleases[1].artist} — ${heroReleases[1].title}` : "Latest Hip-hop release"}
              date= {heroReleases[1] ? new Date(heroReleases[1].releaseDate).toLocaleDateString() : "Live API"}
              />
                       
          </div>

          {/* 6 dual cards placed to the bottom of the right side of the hot section */}

          <MediumCard
              href1="https://tooxclusive.com/news/african-chart-data-world-top-artists-2024/"
              src1="/Wizkid-level-up-1-120x86.webp"
              alt1="Africa's Top Artist of 2024"
              title1="Africans Acts Shine on Chart Data's World's Top Artist of 2024 List"
              date1="Jan 2, 2024 | 04:32"
              href2="/https://tooxclusive.com/songs/lyrics/deela-teni-patience-ozokwor-lyrics/"
              src2="/Deela-Teni-Patience-Ozokwor-120x86.webp"
              alt2="Deela & Teni - Patience Ozokwor"
              title2="Deela & Teni - Patience Ozokwor Lyrics"
              date2="Jan 2, 2025 | 04:07"
              />
          
          <MediumCard
              href1="https://tooxclusive.com/songs/deela-teni-patience-ozokwor/"
              src1="/Deela-Teni-Patience-Ozokwor-120x86.webp"
              alt1="Deela-Teni-Patience-Ozokwo"
              title1="Deela-Teni-Patience-Ozokwor"
              date1="Jan 3, 2025 | 03:57"
              href2="/https://tooxclusive.com/news/deela-teni-our-land-festival-patience-ozokwor-performance/"
              src2="/Deela-Teni-120x86.webp"
              alt2="Deela & Teni"
                title2={"Deela & Teni ignite \"Our Land\" Festival with Electrifying Patience Ozokwor Performance"}
                date2="Jan 3, 2025 | 03:40"
              />
          
          <MediumCard
              href1="/https://tooxclusive.com/news/burna-boy-speaks-out-onstage-altercation/"
              src1="/WhatsApp-Image-2025-01-01-at-19.16.05-120x86.webp"
              alt1="Burna Boy"
              title1="Burna Boy Speaks Out After Onstage Altercation"
              date1="Jan 2, 2024 | 03:28"
              href2="/https://tooxclusive.com/news/nsg-new-album-the-big-6-on-february-28th/"
              src2="/WhatsApp-Image-2025-01-01-at-20.22.49-120x86.webp"
              alt2="NSG to drop new album"
              title2="NSG to Drop New Album, The Big 6 on February 28th"
              date2="Jan 5, 2025 | 01:09"
              />
          
          <MediumCard
              href1="/https://tooxclusive.com/news/rema-cruel-santino-an-collaboration/"
              src1="/WhatsApp-Image-2025-01-01-at-17.06.19-120x86.webp"
              alt1="Rema and Cruel Santino"
              title1="Rema and Cruel Santino: An Explosive Collaborate is coming" 
              date1="Jan 2, 2025 | 00:49"
              href2="https://tooxclusive.com/news/burna-boy-lagos-countdown-by-fan-incident/"
              src2="/burna-boy-higher-official-music-1-2-120x86.webp"
              alt2="Burna-Boy"
              title2="Burna Boy's Lagos Countdown cut short by Fan Incident"
              date2="Jan 1, 2025 | 19:54"
              />
          
          <MediumCard
              href1="/https://tooxclusive.com/songs/kendrick-lamar-not-like-us/"
              src1="/WhatsApp-Image-2024-12-30-at-06.33.27-1-120x86.webp"
              alt1="Kendrick Lamar"
              title1="kendrick Lamar - Not Like Us"
              date1="Dec 31, 2024 | 21:51"
              href2="/https://tooxclusive.com/news/kendrick-lamar-not-like-us-1-2024-complex/"
              src2="/WhatsApp-Image-2024-12-30-at-06.33.27-120x86.webp"
              alt2="Kendrick Lamar"
              title2="Kendrick Lamar's Not Like Us crowned No.1 Song of 2024 by Complex"
              date2="Dec 31, 2024 | 21:24"
              />
          
          <MediumCard
              href1="/https://tooxclusive.com/gospel/dengiyefa-drops-powerful-new-single-eze-a-tribute-to-the-uniqueness-of-god/"
              src1="/Dengiyefa-Eze-Cover-120x86.webp"
              alt1="Dengiyefa"
              title1="Deniyefa Drops Powerful New Single, Eze, a Tribute to the Uniqueness of God"
              date1="Dec 31, 2024 | 17:46"
              href2="/https://tooxclusive.com/songs/shoday-ft-ayo-maff-casablanca/"
              src2="/Shoday-ft.-Ayo-Maff-Casablanca-120x86.webp"
              alt2="Shoday ft. Ayo Maff"
              title2="Shoday ft. Ayo Maff - Casablanca"
              date2="Dec 31, 2024 | 06:36"
              />
          </article>
      </section>
      {/* hero Section */}
      <section id="hot" className="mx-3 grid grid-cols-1 my-5 md:grid-cols-3 gap-4">
        
        <article className="sm:col-span-2 overflow-hidden mb-5 border-t-2"> 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
            
            <DescriptiveCard 
            href="https://tooxclusive.com/next-rated/phreytunez-turn-by-turn/"
            src="/512x512bb-350x250.webp"
            alt="Phreytunez"
            rating="NEXT RATED"
            title="Phreytunez- Turn by Turn"
            date="Jan 3, 2025 | 14:45"
            />
            <DescriptiveCard 
            href="https://tooxclusive.com/next-rated/bennylee-aye-prod-by-xtrapro/"
            src="/1-2-1.webp"
            alt="Bennylee"
            rating="NEXT RATED"
            title='BEENYLEE - AYE [Prod. by XtraPro]'
            date="Dec 16, 2024 | 14:58"
            />
            <DescriptiveCard 
            href="https://tooxclusive.com/download-song/softkid-puff-pass/"
            src="/SoftKid_Puff_And_Pass_9jaflaver-300x300.jpg.webp"
            alt="SoftKid"
            rating="HOT!!"
            title='SoftKid - "Puff & Pass"'
            date="Dec 10, 2024 | 18:45"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            
            <DescriptiveCard 
            href="https://tooxclusive.com/download-song/maxter-bs-new-single-feed-the-body/"
            src="/feed-the-body.webp"
            alt="Maxter B"
            rating="HOT!!"
            title="Maxter B's New Single, 'Feed The Body'"
            date="Dec 16, 2024 | 14:53"
            />
            <DescriptiveCard 
            href="https://tooxclusive.com/next-rated/tolurockstar-brand-new-xmas-new-year-viral-video/"
            src="/PHOTO-2024-12-04-16-24-00.webp"
            alt="Tolurockstar"
            rating="NEXT RATED"
            title="Tolurockstar - Brand New (Xmas/New Year Viral Video)"
            date="Dec 5, 2024 | 11:43"
            />
            <DescriptiveCard 
            href="https://tooxclusive.com/next-rated/vod-releases-new-single-komole/"
            src="/IMG_9421.webp"
            alt="VOD"
            rating="NEXT RATED"
            title="VOD Releases New Single, 'Komole'"
            date="Nov 29, 2024 | 19:28"
            />
          </div>
        </article>


        <article>
          {/* Image Card and bullet links on the right side of the hero section */}
            <Card 
            width="w-full"
            href = "/https://tooxclusive.com/dj-mix/igbo-amaka-highlife-mixtape-2024-by-dj-sjs/"
            src= "/14872247-198937435665-350x250.jpg"
            alt= "Igbo Amaka"
            title= "Igbos Amaka Highlife Mixtape 2024 by DJ SJS"
            date= "Dec 29, 2024 | 12:10"
            />

          <div className="flex flex-col items-start w-full">
            <BulletLink
              href="https://tooxclusive.com/dj-mix/wizkid-starboy-mixtape-2024-by-dj-sjs/"
              title="Wizkid StarBoy Mixtape 2024 by DJ SJS"
            />
            <BulletLink
              href="https://tooxclusive.com/dj-mix/cool-dj-d1-naija-last-quarter-2024-mixtape-vol-2/"
              title="Cool Dj D1 - NAIJA LAST QUARTER 2024 MIXTAPE VOL.2."
            />
            <BulletLink
              href="https://tooxclusive.com/dj-mix/dj-necterr-road-runner-mixtape/"
              title="DJ Necterr - Road Runner Mixtape"
              />
            <BulletLink
              href="https://tooxclusive.com/dj-mix/cool-dj-d1-naija-last-quarter-2024-mixtape/"
              title="Cool Dj D1 - Naija Last Quater 2024 Mixtape"
              />
            <BulletLink
              href="https://tooxclusive.com/dj-mix/mixtape-dj-baddo-our-voice-mix/"
              title="Mixtape DJ Baddo - Our Voice Mix"
              />
          </div>
        </article> 
      </section>


      <section className="mx-3 grid grid-cols-1 my-5 md:grid-cols-3 gap-4">
        
        <article className="overflow-hidden  ">
        <h3 className="flex items-center text-base font-bold mb-3">
            <span className="mr-2 text-black underline">
              <i className="fa-solid fa-music"></i>
            </span>
            <span className="relative">
              Music
              <span className="absolute ml-12 mb-2 bottom-0.5 left-3 w-80 h-0.5 bg-customGray"></span>
            </span>
          </h3>
        <Card 
            width="w-full"
            href = "/https://tooxclusive.com/dj-mix/igbo-amaka-highlife-mixtape-2024-by-dj-sjs/"
            src= "/Ayo-Maff-1-350x250.webp"
            alt= "Igbo Amaka"
            title= "Igbos Amaka Highlife Mixtape 2024 by DJ SJS"
            date= "Dec 29, 2024 | 12:10"
            />

          <div className="flex flex-col items-start w-full">
            <BulletLink
              href="https://tooxclusive.com/news/ayo-maff-teases-new-single-and-hints-at-upcoming-album-release/"
              title="Ayo Maff Teases New Single and Hints at Upcoming Album Release"
            />
            <BulletLink
              href="https://tooxclusive.com/news/rema-2025-trace-awards-nominations-6/"
              title="Rema Dominates 2025 Trace Awards Nominations with 6 Accolades"
            />
            <BulletLink
              href="https://tooxclusive.com/news/trace-awards-2025-best-collaboration/"
              title="TRACE AWARDS 2025: Best Collaboration Nominees"
              />
            <BulletLink
              href="https://tooxclusive.com/news/album-of-the-year-nominees-2025-trace-awards/"
              title="Album of the Year Nominees for the 2025 TRACE Awards"
              />
              <BulletLink
              href="https://tooxclusive.com/news/song-of-the-year-nominees-2025-trace-awards/"
              title="Song of the Year Nominees for the 2025 TRACE Awards"
              />
           </div>
      </article>
      
      <article className="col-span-3 md:col-span-2 overflow-hidden "> 
        <h3 className="flex items-center text-base font-bold mb-3">
            <span className="mr-2 text-black underline">
              <i className="fa-solid fa-music"></i>
            </span>
            <span className="relative">
              Lyrics
              <span className="absolute ml-12 mb-2 bottom-0.5 left-3 w-99 h-0.5 bg-customGray"></span>
            </span>
          </h3>
        <div className="flex flex-col w-full space-y-5 my-auto md:space-x-6 md:flex-row md:space-y-0">
        <Card 
            width="w-full"
            href = "/https://tooxclusive.com/dj-mix/igbo-amaka-highlife-mixtape-2024-by-dj-sjs/"
            src= "/WhatsApp-Image-2024-12-02-at-20.54.22-1-334x250.webp"
            alt= "Igbo Amaka"
            title= "Igbos Amaka Highlife Mixtape 2024 by DJ SJS"
            date= "Dec 29, 2024 | 12:10"
            />
        <Card 
            width="w-full"
            href = "/https://tooxclusive.com/dj-mix/igbo-amaka-highlife-mixtape-2024-by-dj-sjs/"
            src= "/Tyla-Tyla-album-350x250.webp"
            alt= "Igbo Amaka"
            title= "Igbos Amaka Highlife Mixtape 2024 by DJ SJS"
            date= "Dec 29, 2024 | 12:10"
            />
          </div>
          <div className="flex flex-col w-full space-y-5 my-auto md:space-x-6 md:flex-row md:space-y-0">
            <div className="flex flex-col items-start w-full">
              <BulletLink
                href="https://tooxclusive.com/songs/lyrics/wizkid-a-million-blessings-lyrics/"
                title="Wizkid - A Million Blessings Lyrics"
                />
              <BulletLink
                href = " https://tooxclusive.com/songs/lyrics/kendrick-lamar-squabble-up-lyrics/"
                title="Kendrick Lamar - Squabble Up Lyrics"
                />
              <BulletLink
                href = "https://tooxclusive.com/songs/lyrics/asake-travis-scott-active-lyrics/"
                title="Asake & Travis Scott - Active Lyrics"
                />
              <BulletLink
                href="https://tooxclusive.com/songs/lyrics/asake-stormzy-suru-lyrics/"
                title="Asake & Stormzy - Suru Lyrics"
                />
              <BulletLink
                href="https://tooxclusive.com/songs/lyrics/asake-my-heart-lyrics/"
                title="Asake - My Heart Lyrics"
                />   
                           
            </div>
            <div className="flex flex-col items-start w-full">
              <BulletLink
                href="https://tooxclusive.com/songs/lyrics/asake-fuji-vibe-lyrics/"
                title="Asake - Fuji Vibe Lyrics"
                />
              <BulletLink
                href = "https://tooxclusive.com/songs/lyrics/asake-i-swear-lyrics/"
                title="Asake - I Swear Lyrics"
                />
              <BulletLink
                href = "https://tooxclusive.com/songs/lyrics/llona-cant-breathe-lyrics//"
                title="Ilona - Can't Breathe Lyrics"
                />
              <BulletLink
                href="hhttps://tooxclusive.com/songs/lyrics/asake-central-cee-wave-lyrics//"
                title="Asake & Central Cee - Wave Lyrics"
                />
              <BulletLink
                href="https://tooxclusive.com/songs/lyrics/sarz-feat-asake-cmon-look-lyrics/"
                title="Sarz feat. Asake - C'mon Look Lyrics"
                />
                <BulletLink
                  href="https://tooxclusive.com/songs/lyrics/khalid-ayra-starr-make-it-up-to-you-lyrics/"
                  title="Khalid & Ayra Starr -make it up to your Lyrics"
                  />
          </div>

          </div>
      </article>
      </section>
      {/* Latest Post Session */}
      <section className="mx-3  my-5 ">
        <article className=" grid grid-cols-1 md:grid-cols-3  gap-4 overflow-hidden mb-5 ">
          {latestReleaseCards.slice(0, 3).map((release) => (
            <CalloutCard
              key={release.id}
              imageUrl={release.artwork}
              imageAlt={release.title}
              category={release.category}
              title={`${release.artist} — ${release.title}`}
              author="Music API"
              authorUrl="https://music.apple.com"
              postUrl={release.link}
              date={new Date(release.releaseDate).toLocaleDateString()}
            />
          ))}
        </article >
        <article className=" grid grid-cols-1 md:grid-cols-3  gap-4 overflow-hidden mb-5 ">
          <CalloutCard
            imageUrl="/FOLA-what-a-feeling-EP-320x250.webp"  
            imageAlt="Pryme Enlists Chike for the Remix of His Trending Hit, 'Carry Go'"
            category="GOSPEL"
            title="Emmanuel - Abimbola Koleosho"
            author="Duncan"
            authorUrl="https://tooxclusive.com/author/batimoore/"
            postUrl="https://tooxclusive.com/gospel/video-emmanueli-abimbola-koleosho/"
            date="Dec 31, 2024 | 18:06"
          />
          <CalloutCard
            imageUrl="/Kendrick-Lamar-squabble-up-252x250.webp"
            imageAlt="Pryme Enlists Chike for the Remix of His Trending Hit, 'Carry Go'"
            category="GOSPEL"
            title="Emmanuel - Abimbola Koleosho"
            author="Duncan"
            authorUrl="https://tooxclusive.com/author/batimoore/"
            postUrl="https://tooxclusive.com/gospel/video-emmanueli-abimbola-koleosho/"
            date="Dec 31, 2024 | 18:06"
          />
          <CalloutCard
            imageUrl="/FOLA-what-a-feeling-EP-320x250.webp"
            imageAlt="Pryme Enlists Chike for the Remix of His Trending Hit, 'Carry Go'"
            category="GOSPEL"
            title="Emmanuel - Abimbola Koleosho"
            author="Duncan"
            authorUrl="https://tooxclusive.com/author/batimoore/"
            postUrl="https://tooxclusive.com/gospel/video-emmanueli-abimbola-koleosho/"
            date="Dec 31, 2024 | 18:06"
          />

        </article >
        <article className=" grid grid-cols-1 md:grid-cols-3  gap-4 overflow-hidden mb-5 ">
          <CalloutCard
            imageUrl="/2Point1-Sthandwa-Sam-ft.-BelloM-Epic-DJ-Seneath-X-Morizo-350x250.webp"  
            imageAlt="Pryme Enlists Chike for the Remix of His Trending Hit, 'Carry Go'"
            category="GOSPEL"
            title="Emmanuel - Abimbola Koleosho"
            author="Duncan"
            authorUrl="https://tooxclusive.com/author/batimoore/"
            postUrl="https://tooxclusive.com/gospel/video-emmanueli-abimbola-koleosho/"
            date="Dec 31, 2024 | 18:06"
          />
          <CalloutCard
            imageUrl="/IMG_4311-350x250.webp"
            imageAlt="Pryme Enlists Chike for the Remix of His Trending Hit, 'Carry Go'"
            category="GOSPEL"
            title="Emmanuel - Abimbola Koleosho"
            author="Duncan"
            authorUrl="https://tooxclusive.com/author/batimoore/"
            postUrl="https://tooxclusive.com/gospel/video-emmanueli-abimbola-koleosho/"
            date="Dec 31, 2024 | 18:06"
          />
          <CalloutCard
            imageUrl="/Picture-1-350x250.webp"
            imageAlt="Pryme Enlists Chike for the Remix of His Trending Hit, 'Carry Go'"
            category="GOSPEL"
            title="Emmanuel - Abimbola Koleosho"
            author="Duncan"
            authorUrl="https://tooxclusive.com/author/batimoore/"
            postUrl="https://tooxclusive.com/gospel/video-emmanueli-abimbola-koleosho/"
            date="Dec 31, 2024 | 18:06"
          />

        </article >

      </section>
    </main>
  );
}
