import React, { useState } from 'react';
import { Listbox } from '@headlessui/react'

const MahasiswaList = Array.from({ length: 10 }, (_, i) => ({
  value: `mahasiswa_${i + 1}`,
  label: `Mahasiswa ${i + 1}`
}));


const AspekOptions = [
  { value: "aspek_penilaian_1", label: "Aspek Penilaian 1" },
  { value: "aspek_penilaian_2", label: "Aspek Penilaian 2" },
  { value: "aspek_penilaian_3", label: "Aspek Penilaian 3" }
];

const OptionValues = Array.from({ length: 10 }, (_, i) => i + 1);

function App() {

  const [ values, setValues ] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleChangeAspekPenilaian = (aspek, mahasiswa, selectedValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [ aspek ]: {
        ...prevValues[ aspek ],
        [ mahasiswa ]: selectedValue
      }
    }));
  };

  const handleSave = () => {
    setIsButtonClicked(true);
    console.log(values);
  };

  return (
    <div className="container">
      <div className="text-white text-2xl mb-[30px]">Aplikasi Penilaian Mahasiswa</div>
      <div className="mt-5 flex justify-between">
        <div className="text-white lg:w-[100px] w-[100px]"></div>
        {AspekOptions.map((aspek) => (
          <div key={aspek.value} className="text-white lg:w-[200px] w-auto">
            {aspek.label}
          </div>
        ))}
      </div>
      {MahasiswaList.map((mahasiswa) => (
        <div key={mahasiswa} className="mt-1 p-3 flex items-center justify-between bg-white rounded-lg">
          <div className="flex lg:flex-row flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>{mahasiswa.label}</div>
          </div>
          {AspekOptions.map((aspek) => (
            <div key={aspek.value} className="lg:w-[200px] w-auto">
              <Listbox
                value={values[ aspek.value ]?.[ mahasiswa.value ]}
                onChange={(selectedValue) => handleChangeAspekPenilaian(aspek.value, mahasiswa.value, selectedValue)}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500  focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-600 sm:text-sm sm:leading-5">
                    <span className="block truncate">
                      {values[ aspek.value ]?.[ mahasiswa.value ] || "Pilih"}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {OptionValues.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `${active ? 'text-white bg-yellow-500' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}
                            >
                              {option}
                            </span>
                            {selected && (
                              <span
                                className={`${active ? 'text-white' : 'text-yellow-300'} absolute inset-y-0 right-0 flex items-center pr-4`}
                              >
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          ))}
        </div>
      ))}
      <div className="flex float-right pr-[30px] pt-5">
        <button className="mt-4 bg-black hover:bg-blue-700 text-white py-2 px-6 rounded" onClick={handleSave}>
          Simpan
        </button>
      </div>
      <div className="mt-32 flex flex-start text-white text-start">
        {isButtonClicked && (
          <pre>{JSON.stringify(values, null, 3)}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
