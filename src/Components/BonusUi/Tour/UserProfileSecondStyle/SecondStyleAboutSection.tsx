import { Href, ImagePath, PainterTourTitle, ReadMoreTour, WilliamJennings, WonderFullTour } from '@/Constant'
import Image from 'next/image'
import Link from 'next/link'

const SecondStyleAboutSection = () => {
  const PainterTour = " Is most renowned for his expressive colorization, creative landscapes, and stormy, sometimes violent maritime works. However, this moody image of the Devil's Bridge in Switzerland, close to the Gotthard Pass, feels incredibly authentic and accurately depicts historical occasions when Russian general Suvorov crossed the Alps and fought not only far larger enemy troops!"
  const PainterTourSpan = "The curved canvas is enclosed in a complex frame that the artist created but that his buddy Gottlieb Christian Kuhn carved. A variety of Christian symbols are depicted on the frame, including the faces of five infant angels, a star, grapes, vines, corn, and God's eye.Many of the Romantic elements and subjects that he would explore throughout his career are present in this work, one of his earliest, most notable of which is the landscape's significant significance. In spite of the altarpiece's inclusion of a crucifix, the emphasis is"
  return (
    <>
      <h5 className="pb-2">{WonderFullTour}</h5>
      <p className="block-ellipsis">
        {PainterTourTitle}<em className="font-danger">{WilliamJennings}</em>{PainterTour}
      </p>
      <div className="img-container">
        <div id="aniimated-thumbnials">
          <Link href={Href}>
            <Image width={1528} height={441} className="img-fluid rounded" src={`${ImagePath}/other-images/profile-style-img3.png`} alt="gallery" />
          </Link>
          <p className="block-ellipsis pt-3">
            {PainterTourSpan}
            <Link className="font-danger ms-1" href={Href}>{ReadMoreTour}</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SecondStyleAboutSection