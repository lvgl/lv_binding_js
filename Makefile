DEV_X86=dev_x86
DEV_ARM=dev_arm
DEV_DJI=dev_dji
REL_DJI=rel_dji
BUILD_ARM=build_arm

dev-x86:
	@mkdir -p $(DEV_X86)
	cmake -B "$(DEV_X86)" \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=x86 \
		-DOPENSSL_ROOT_DIR=/usr/local/opt/openssl@3 \
		-DOPENSSL_LIBRARIES=/usr/local/opt/openssl@3/lib
	cmake --build $(DEV_X86)

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


dev-dji:
	@mkdir -p $(DEV_DJI)
	cmake -B "$(DEV_DJI)" \
	    -DCMAKE_TOOLCHAIN_FILE=${ANDROID_NDK_HOME}/build/cmake/android.toolchain.cmake \
		-DANDROID_ABI=armeabi-v7a \
		-DANDROID_PLATFORM=android-23 \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=dji 
	cmake --build $(DEV_DJI)

rel-dji:
	@mkdir -p $(REL_DJI)
	cmake -B "$(REL_DJI)" \
	    -DCMAKE_TOOLCHAIN_FILE=${ANDROID_NDK_HOME}/build/cmake/android.toolchain.cmake \
		-DANDROID_ABI=armeabi-v7a \
		-DANDROID_PLATFORM=android-23 \
		-DCMAKE_BUILD_TYPE=Release \
		-DCMAKE_BUILD_PLATFORM=dji \
		-DANDROID_ARM_NEON=TRUE
	cmake --build $(REL_DJI)

run-dev-dji:
	adb connect 192.168.42.5:5555
	npm run bundle
	cmake --build $(DEV_DJI)
	adb shell "mkdir -p /blackbox/lvjs"
	adb push demo /blackbox/lvjs/
	adb push $(DEV_DJI)/lib /blackbox/lvjs/
	adb push $(DEV_DJI)/lvgljs /blackbox/lvjs/
	adb push $(DEV_DJI)/src/deps/curl/lib/libcurl-d.so /blackbox/lvjs/
	adb shell "setprop dji.glasses_wm150_service 0"
	adb shell "cd /blackbox/lvjs && chmod u+x ./lvgljs && LD_LIBRARY_PATH=/blackbox/lvjs gdbserver :5039 ./lvgljs ./demo/widgets/index.js" 

run-rel-dji:
	adb connect 192.168.42.5:5555
	npm run bundle
	cmake --build $(REL_DJI)
	adb shell "setprop dji.glasses_wm150_service 0"
	adb shell "mkdir -p /blackbox/lvjs"
	adb push demo /blackbox/lvjs/
	adb push $(REL_DJI)/lib /blackbox/lvjs/
	adb push $(REL_DJI)/lvgljs /blackbox/lvjs/
	adb push $(REL_DJI)/src/deps/curl/lib/libcurl.so /blackbox/lvjs/
	adb shell "cd /blackbox/lvjs && chmod u+x ./lvgljs && LD_LIBRARY_PATH=/blackbox/lvjs ./lvgljs ./demo/widgets/index.js" 