import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React, { lazy, useEffect, useState } from 'react';
import { getMenuListApi } from '@/api/menu';
import { useRouteContext } from '@/routers/context';
import { RouteObject, useNavigate } from 'react-router-dom';
import { IMenu } from '@/interface/menu';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import DataUtil from '@/utils/dataUtil';

type MenuType = IMenu & ItemType;

//#region define
const { Header, Content, Sider } = Layout;
//@ts-ignore
export const modules = import.meta.glob('@/pages/**/index.tsx');
export const components = Object.keys(modules).reduce<Record<string, () => Promise<any>>>((prev, path: string) => {
	const componentKey = path;
	prev[componentKey] = async () => {
		try {
			return await import('@/pages/test11/index.tsx');
		} catch {}
	};

	return prev;
}, {});
//#endregion

const BasicLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [menu, setMenu] = useState<MenuType[]>([]);
	const { routes, updateRoutes } = useRouteContext();
	const navigate = useNavigate();
	useEffect(() => {
		async function getMenus() {
			const menuData = await getMenuListApi();
			setMenu(treeMenuData(menuData));
		}
		getMenus();
	}, []);
	const treeMenuData = (menus: MenuType[]): MenuType[] => {
		const flatMenuData = menus.map(menu => {
			return {
				...menu,
				key: menu.path,
				label: menu.name,
			};
		});
		const treeMenuData = DataUtil.toTree(flatMenuData);
		return treeMenuData;
	};

	useEffect(() => {
		const routeData = menuToRoute(menu);
		updateRoutes(prevRoutes => {
			const routes = prevRoutes.filter(item => {
				return item.path !== '*';
			});
			return [...routes, ...routeData];
		});
	}, [menu]);

	//@ts-ignore
	const handleSelect = ({ item }) => {
		console.log(routes, item);
		navigate(item.props.path);
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}></div>
				<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={menu} onSelect={handleSelect} />
			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content>Content</Content>
			</Layout>
		</Layout>
	);
};

export default BasicLayout;

function menuToRoute(menu: MenuType[]): RouteObject[] {
	return menu.map<RouteObject>(item => {
		if (item && item.children) {
			return {
				path: item.key,
				// Component: lazy(components),
				Component: components['/src/pages/test11/index.tsx'],
				children: menuToRoute(item.children),
			};
		} else {
			return {
				path: item.key,
				Component: components['/src/pages/test11/index.tsx'],
			};
		}
	});
}
