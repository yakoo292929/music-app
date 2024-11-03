
/**
 * ===========================================================================================
 * SYSTEM NAME    : music-app
 * PROGRAM ID     : src/components/SearchInput.js
 * PROGRAM NAME   : SearchInput.js
 *                : 曲検索
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/11/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


////////////////////////////////////////////////////////////////////////
// SearchInput
////////////////////////////////////////////////////////////////////////
export function SearchInput(props) {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <section className="mb-10">
      <input
        onChange={props.onInputChange}
        className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="探したい曲を入力してください"
      />
      <button
        onClick={props.onSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>

  );

}
