reactpdf_master="https://github.com/diegomura/react-pdf.git"

prepare_test() {
  rm -rf ./react-pdf
  yarn unlink @react-pdf/renderer
}

build_and_link_reactpdf() {
  git clone $reactpdf_master
  cd react-pdf
  yarn install
  yarn build
  yarn link
  cd ..
}

link_reactpdf() {
  yarn remove @react-pdf/renderer
  yarn link @react-pdf/renderer
}

prepare_test
build_and_link_reactpdf
link_reactpdf
