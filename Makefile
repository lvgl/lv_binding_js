BUILD_DIR=debug
BUILDTYPE?=Debug

build-x86:
	@mkdir -p $(BUILD_DIR)
	cd $(BUILD_DIR); cmake ../ -DCMAKE_BUILD_TYPE=$(BUILDTYPE) -DCMAKE_BUILD_PLATFORM=x86 -DOPENSSL_ROOT_DIR=/usr/local/Cellar/openssl@3/3.0.5 -DOPENSSL_LIBRARIES=/usr/local/Cellar/openssl@3/3.0.5/lib
	cmake --build $(BUILD_DIR)

build-arm:
	@mkdir -p $(BUILD_DIR)
	cd $(BUILD_DIR); cmake ../ -DCMAKE_BUILD_TYPE=$(BUILDTYPE) -DCMAKE_BUILD_PLATFORM=arm
	cmake --build $(BUILD_DIR)

clean:
	rm -rf $(BUILD_DIR)