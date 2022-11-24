declare module 'Models' {
  import { Action, ActionType } from 'constants/enum'

  export interface SelectProps {
    path: string
    valueSelected?: any
    bordered?: boolean
    showArrow?: boolean
    multi?: boolean
    disabled?: boolean
    showSearch?: boolean
    allowClear?: boolean
    placeholder?: any
    hideSelected?: boolean
    exception?: any
    options?: any[]
    catalog?: any
    hasParent?: boolean
    hasChildren?: boolean
    handleBlurOption?: () => void
    handleChangeOption?: (path: string, value: any) => void
    handleOnClear?: () => void
    onChange?: (value: any) => void
    areaLevel?: number
    province?: number
    onChange?: any
    sysGroup?: number
    packageItem?: any
    orderType?: any
    reasonType?: any
    contactName?: any
    goodsId?: any
    serviceIds?: any[]
    partnerTypes?: any[]
    isRoofCatalog?: boolean
    isRootReason?: boolean
    isParent?: boolean
    configRateId?: any
    tenantId?: any
    area?: any
    services?: any
    catalogCode?: any
    statusCatalog?: any
    type?: any
    closeReasonId?: string
    partner?: string
    defaultName?: string
    cameraId?: string
    parentId?: any
    postfix?: any
    isDefault?: boolean
    selectStatus?: boolean
    tenantStatus?: TenantStatus[]
    agencyStatus?: AgencyStatus[]
    serviceStatus?: ServiceStatus[]
    isWarranty?: any
    allowFilterProvince?: boolean
    notCode?: any[]
    key?: string
    isCombo?: Boolean
    dateApplied?: any
    areaId?: string
    excludeCode?: string[]
    typeDoc?: PartnerDocumentType
    status?: BooleanType
  }
}
