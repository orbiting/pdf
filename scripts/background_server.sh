build_and_start_pdf_server() {
  yarn build
  yarn start &
  sleep 3
}

build_and_start_pdf_server
