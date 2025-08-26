import type { Item } from "@/configs/types";


/**
 * Arguments for exporting items to CSV.
 * @property items - Array of bidding items to export.
 */
interface ExportItemsToCSVArg {
  items: Item[];
}

const HEADERS = [
  "STT",
  "TBMT",
  "Tên bên mời thầu",
  "Mã phần/lô",
  "Tên phần/lô",
  "Nhà thầu trúng thầu",
  "Danh mục hàng hóa",
  "Ký mã hiệu",
  "Nhãn hiệu",
  "Hãng sản xuất",
  "Đơn vị tính",
  "Khối lượng",
  "Xuất xứ [quốc gia, vùng lãnh thổ sản xuất]",
  "Năm sản xuất",
  "Cấu hình, tính năng kỹ thuật cơ bản",
  "Mã HS",
  "Đơn giá dự thầu (đã bao gồm thuế, phí, lệ phí nếu có)",
  "Thành tiền (đã bao gồm thuế, phí, lệ phí nếu có)"
];

/**
 * Converts an array of bidding items to a CSV string formatted for bid submissions.
 * @param items - Array of items to export.
 * @returns CSV string with headers and item rows.
 */
export function exportItemsToBidCSV(
  { items }: ExportItemsToCSVArg
): string {
  const csvRows: string[] = [];
  // Add header row to CSV, escaping quotes for Excel compatibility
  csvRows.push(HEADERS.map(h => `"${h.replace(/"/g, '""')}"`).join(","));

  // Add each item as a row in the CSV
  items.forEach((item, idx) => {
    const row = [
      idx + 1, // Serial number (STT)
      item.notifyNo ?? "", // TBMT
      item.procuringEntityName ?? "", // Tên bên mời thầu
      item.parent ?? "", // Mã phần/lô
      item.bidItem ?? "", // Tên phần/lô
      item.contractorName ?? "", // Nhà thầu trúng thầu
      item.name ?? "", // Danh mục hàng hóa
      item.codeGood ?? "", // Ký mã hiệu
      item.labelGood ?? "", // Nhãn hiệu
      item.manufacturer ?? "", // Hãng sản xuất
      item.uom ?? "", // Đơn vị tính
      item.qty ?? "", // Khối lượng
      item.origin ?? "", // Xuất xứ [quốc gia, vùng lãnh thổ sản xuất]
      item.yearManufacture ?? "", // Năm sản xuất
      item.feature ?? "", // Cấu hình, tính năng kỹ thuật cơ bản
      item.maHS ?? "", // Mã HS
      item.bidPrice ?? "", // Đơn giá dự thầu (đã bao gồm thuế, phí, lệ phí nếu có)
      item.amount ?? "" // Thành tiền (đã bao gồm thuế, phí, lệ phí nếu có)
    ].map(v => `"${String(v).replace(/"/g, '""')}"`); // Escape quotes for CSV

    csvRows.push(row.join(","));
  });

  // Return the final CSV string
  return csvRows.join("\n");
}
