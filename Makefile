BUILD_SIM=build

.PHONY: simulator clean

simulator:
	@mkdir -p $(BUILD_SIM)
	cmake -B "$(BUILD_SIM)" -DCMAKE_BUILD_TYPE=Simulator
	cmake --build $(BUILD_SIM)

clean:
	rm -rf $(BUILD_SIM)
