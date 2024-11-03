/**
 * ===========================================================================================
 * SYSTEM NAME    : music-app
 * PROGRAM ID     : src/components/Pagination.js
 * PROGRAM NAME   : Pagination.js
 *                : ページネーション
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/11/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/


////////////////////////////////////////////////////////////////////////
// Pagination
////////////////////////////////////////////////////////////////////////
export function Pagination(props) {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <div className="mt-8 flex justify-center">

      <button
        disabled={props.onPrev === null}
        onClick={props.onPrev}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <button
        disabled={props.onNext === null}
        onClick={props.onNext}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4"
      >
        Next
      </button>

    </div>

  );

}
