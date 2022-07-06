BUILD_DIR=debug
BUILDTYPE?=Debug

all: build

build:
	@mkdir -p $(BUILD_DIR)
	cd $(BUILD_DIR); cmake ../ -DCMAKE_BUILD_TYPE=$(BUILDTYPE)
	cmake --build $(BUILD_DIR)

clean:
	rm -rf $(BUILD_DIR)