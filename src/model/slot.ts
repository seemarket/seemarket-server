interface Slot {
  id: number;
  drink_id: number;
  has_drink: boolean;
  incoming_time: string;
  row: number;
  column: number;
  depth: number;
}
export default Slot;