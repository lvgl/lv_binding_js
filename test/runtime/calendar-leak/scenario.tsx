import { Calendar, Dimensions, EAlignType, Mask, View } from 'lvgljs-ui';
import React from 'react';

const { width, height } = Dimensions.window;

const calendarStyle = {
  width: 300,
  height: 300,
};

export type CalendarOpenCloseScenarioProps = {
  showCalendar: boolean;
};

/** Mirrors demo/widgets profile birthday Mask + Calendar open/close. */
export function CalendarOpenCloseScenario({ showCalendar }: CalendarOpenCloseScenarioProps) {
  return (
    <View style={{ width, height, padding: 0, 'border-width': 0 }}>
      {showCalendar && (
        <Mask
          onClick={() => {
            /* closed by next render pass */
          }}
        >
          <Calendar
            today="2022-10-1"
            style={calendarStyle}
            onChange={() => {
              /* closed by next render pass */
            }}
            align={{
              type: EAlignType.ALIGN_CENTER,
            }}
          />
        </Mask>
      )}
    </View>
  );
}
