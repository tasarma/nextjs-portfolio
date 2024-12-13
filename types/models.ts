import { Material, Mesh } from "three"

export interface WizardProps {
    [key: string]: any
}

export interface GLTFResult {
    nodes: {
        [key: string]: Mesh
    }
    materials: {
        [key: string]: Material
    }
}

export interface StaffProps extends WizardProps {}
export interface HatProps extends WizardProps {}