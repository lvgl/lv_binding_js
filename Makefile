DEV_X86=dev_x86
DEV_ARM=dev_arm
DEV_MACOS=dev_macos
BUILD_ARM=build_arm

clean:
	rm -rf $(DEV_X86)
	rm -rf $(DEV_ARM)
	rm -rf $(DEV_MACOS)
	rm -rf $(BUILD_ARM)

dev-x86:
	@mkdir -p $(DEV_X86)
	cmake -B "$(DEV_X86)" \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=x86 \
		-DOPENSSL_ROOT_DIR=/usr/local/opt/openssl@3 \
		-DOPENSSL_LIBRARIES=/usr/local/opt/openssl@3/lib
	cmake --build $(DEV_X86)

dev-macos:
	BREW_PREFIX=$(shell brew --prefix)
	CMAKE_BUILD_PLATFORM=$(shell uname -m | sed -e 's/x86_64/x86/' -e 's/arm64/arm/')

	@mkdir -p $(DEV_MACOS)
	cmake -B "$(DEV_MACOS)" \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM="$(CMAKE_BUILD_PLATFORM)" \
		-DOPENSSL_ROOT_DIR="$(BREW_PREFIX)/opt/openssl@3" \
		-DOPENSSL_LIBRARIES="$(BREW_PREFIX)/opt/openssl@3/lib"
	cmake --build $(DEV_ARM)

dev-arm:
	@mkdir -p $(DEV_ARM)
	cmake -B "$(DEV_ARM)" \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=arm \
		-DCMAKE_C_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-gcc \
		-DCMAKE_CXX_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-g++ \
		-DCMAKE_CURL_LIB=/home/sxs/curl/build_arm/lib/libcurl.so \
		-DCMAKE_CURL_INCLUDE_DIRS=/home/sxs/curl/build_arm/include \
		-DCMAKE_SSL_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libssl.so.3 \
		-DCMAKE_CRYPTO_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libcrypto.so.3
	cmake --build $(DEV_ARM)

build-arm:
	@mkdir -p $(BUILD_ARM)
	cmake -B "$(BUILD_ARM)" \
		-DCMAKE_BUILD_TYPE=Release \
		-DCMAKE_BUILD_PLATFORM=arm \
		-DCMAKE_C_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-gcc \
		-DCMAKE_CXX_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-g++ \
		-DCMAKE_CURL_LIB=/home/sxs/curl/build_arm/lib/libcurl.so \
		-DCMAKE_CURL_INCLUDE_DIRS=/home/sxs/curl/build_arm/include \
		-DCMAKE_SSL_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libssl.so.3 \
		-DCMAKE_CRYPTO_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libcrypto.so.3
	cmake --build $(BUILD_ARM)
