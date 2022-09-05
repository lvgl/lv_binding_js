
dev-x86:
	@mkdir -p dev-x86
	cmake -B dev-x86 \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=x86 \
		-DCMAKE_C_COMPILER=/usr/local/bin/gcc \
		-DCMAKE_CXX_COMPILER=/usr/local/bin/g++
	cmake --build $(BUILD_DIR)

dev-arm:
	@mkdir -p dev-arm
	cmake -B dev-x86 \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=arm \
		-DCMAKE_C_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-gcc \
		-DCMAKE_CXX_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-g++ \
		-DCMAKE_CURL_LIB=/home/sxs/curl/build_arm/lib/libcurl.so \
		-DCMAKE_CURL_INCLUDE_DIRS=/home/sxs/curl/build_arm/include \
		-DCMAKE_SSL_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libssl.so.3 \
		-DCMAKE_CRYPTO_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libcrypto.so.3
	cmake --build $(BUILD_DIR)

build-arm:
	@mkdir -p build-arm
	cmake -B build-arm

clean:
	rm -rf $(BUILD_DIR)