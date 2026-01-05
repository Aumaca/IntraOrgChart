import type { TreeData } from "../../interfaces/interfaces"

export const getDepartmentData = async (id: string): Promise<TreeData> => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/data/department/${id}`
		)

		if (!response.ok) throw new Error("Failed to fetch department")

		return (await response.json()) as TreeData
	} catch (error) {
		console.error(error)
		throw error
	}
}
