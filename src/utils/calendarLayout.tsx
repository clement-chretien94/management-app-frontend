import type { LayoutBlock, TimeBlock } from "@/types";

export const MINUTE_HEIGHT = 2;

export const buildLayoutForDay = (
  date: Date,
  blocks: TimeBlock[],
  startHour: number,
  endHour: number,
) => {
  const dayRange = getDayRange(date);
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  const normalized = blocks
    .map((block) => {
      const startTime = new Date(block.startTime);
      const endTime = new Date(block.endTime);
      return {
        block,
        startMinutes: toMinutes(startTime, dayRange.start),
        endMinutes: toMinutes(endTime, dayRange.start),
      };
    })
    .filter(
      (item) =>
        item.endMinutes > startMinutes && item.startMinutes < endMinutes,
    )
    .map((item) => ({
      ...item,
      startMinutes: Math.max(item.startMinutes, startMinutes),
      endMinutes: Math.min(item.endMinutes, endMinutes),
    }))
    .filter((item) => item.endMinutes > item.startMinutes)
    .sort((a, b) =>
      a.startMinutes === b.startMinutes
        ? a.endMinutes - b.endMinutes
        : a.startMinutes - b.startMinutes,
    );

  const groups: Array<{
    blocks: typeof normalized;
    endMinutes: number;
  }> = [];

  normalized.forEach((item) => {
    const lastGroup = groups[groups.length - 1];
    if (!lastGroup || item.startMinutes >= lastGroup.endMinutes) {
      groups.push({ blocks: [item], endMinutes: item.endMinutes });
      return;
    }
    lastGroup.blocks.push(item);
    lastGroup.endMinutes = Math.max(lastGroup.endMinutes, item.endMinutes);
  });

  const layout: LayoutBlock[] = [];

  groups.forEach((group) => {
    const columns: number[] = [];
    const assigned = group.blocks.map((item) => {
      let column = columns.findIndex((end) => end <= item.startMinutes);
      if (column === -1) {
        column = columns.length;
        columns.push(item.endMinutes);
      } else {
        columns[column] = item.endMinutes;
      }

      return {
        item,
        column,
      };
    });

    const columnCount = columns.length || 1;
    assigned.forEach(({ item, column }) => {
      const top = (item.startMinutes - startMinutes) * MINUTE_HEIGHT;
      const height = (item.endMinutes - item.startMinutes) * MINUTE_HEIGHT;
      layout.push({
        block: item.block,
        startMinutes: item.startMinutes,
        endMinutes: item.endMinutes,
        top,
        height,
        column,
        columnCount,
      });
    });
  });

  return {
    layout,
    startMinutes,
    endMinutes,
  };
};

const getDayRange = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const toMinutes = (date: Date, dayStart: Date) => {
  return Math.floor((date.getTime() - dayStart.getTime()) / 60000);
};
