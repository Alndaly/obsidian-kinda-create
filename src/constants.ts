export interface Type {
	name: string;
	id: number;
	description: string;
	base_location: string;
}

export const ALL_TYPES: Type[] = [
	{
		id: 1,
		name: "随笔",
		description: "创建随笔",
		base_location: "随笔"
	},
	{
		id: 2,
		name: "日记",
		description: "创建日记",
		base_location: "日记"
	},
	{
		id: 3,
		name: "联系人",
		description: "创建联系人",
		base_location: "联系人"
	},
];
