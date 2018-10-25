reactpdf_master="https://github.com/diegomura/react-pdf.git"

prepare_test() {
  rm -rf ./react-pdf
  yarn unlink @react-pdf/renderer
}

build_and_link_reactpdf() {
  git clone $reactpdf_master
  cd react-pdf
  yarn install
  yarn link
  cd ..
}

build_and_start_pdf_server() {
  yarn remove @react-pdf/renderer
  yarn link @react-pdf/renderer
  yarn build
  yarn start &
  sleep 3
}

prepare_test
build_and_link_reactpdf
build_and_start_pdf_server
