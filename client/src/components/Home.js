export default function Home() {
  return (
    <>
      <div id="gallery" className="max-w-[1140px] m-auto w-full px-4 py-16">
        <h1 className="text-center text-gray-700 p-4 text-3xl"> HOME </h1>
      </div>

      <div className="grid sm:grid-cols-5 gap-4">
        <div className="sm:col-span-3 col-span-2 row-span-2">
          <img
            className="w-full h-full object-cover"
            src="https://cache.marieclaire.fr/data/photo/w1000_ci/5e/portant-coudre-vetements-ecologie2.jpg"
            alt="clothes"
          />
        </div>

        <div>
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/photos-gratuite/haute-couture-look-young-elegant-confiant-heureux-beau-modele-homme-affaires-costume-vetements-style-vie-dans-rue-lunettes-soleil_158538-14107.jpg"
            alt="man"
          />
        </div>

        <div>
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/photos-gratuite/portrait-modele-belle-femme-vetements-vintage_158538-10383.jpg"
            alt="woman"
          />
        </div>

        <div>
          <img
            className="w-full h-full object-cover"
            src="https://i.pinimg.com/736x/ba/05/e8/ba05e8a6974c8f5da44adb88f4e4e379.jpg"
            alt="young boy"
          />
        </div>

        <div>
          <img
            className="w-full h-full object-cover"
            src="https://www.hummel.fr/dw/image/v2/BDWL_PRD/on/demandware.static/-/Sites-sometime-master-catalog/default/dw2d6b92ac/images/model/218875-8749_A.png?sw=514&sh=685&q=80"
            alt="children"
          />
        </div>
      </div>
    </>
  );
}
