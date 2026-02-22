BUILD_SIM=build
BUILD_LIB=build_lib

.PHONY: setup simulator lib demo clean

setup:
	git submodule update --recursive --init
	npm install

simulator:
	@mkdir -p $(BUILD_SIM)
	cmake -B "$(BUILD_SIM)" -DCMAKE_BUILD_TYPE=Simulator -DBUILD_STATIC_LIB=OFF
	cmake --build $(BUILD_SIM) -j

lib:
	@mkdir -p $(BUILD_LIB)
	cmake -B "$(BUILD_LIB)" -DCMAKE_BUILD_TYPE=Simulator -DBUILD_STATIC_LIB=ON
	cmake --build $(BUILD_LIB) -j

demo: simulator
	@PROJECT=$${PROJECT:-widgets}; \
	echo "Running demo with project: $$PROJECT"; \
	node build.js && \
	./${BUILD_SIM}/lvgljs run demo/$$PROJECT/index.js

clean:
	rm -rf $(BUILD_SIM) $(BUILD_LIB)
