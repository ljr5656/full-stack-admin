export interface IMenu {
	_id: number;
	name: string;
	parent_id: number;
	path: string;
	component: string;
	create_time: number;
	update_time: number;
	_d: 0 | 1;
}
