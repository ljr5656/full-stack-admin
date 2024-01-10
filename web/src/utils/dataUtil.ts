class DataUtil {
	static toTree<T>(data: T[], idKey: string = '_id', parentKey: string = 'parent_id'): T[] {
		const map: Record<string, T> = {};
		const result: T[] = [];

		data.forEach(item => {
			map[item[idKey]] = item;
		});

		data.forEach(item => {
			const parent = map[item[parentKey]];
			if (parent) {
				parent.children = parent.children || [];
				parent.children.push(item);
			} else {
				result.push(item);
			}
		});

		return result;
	}
}

export default DataUtil;
