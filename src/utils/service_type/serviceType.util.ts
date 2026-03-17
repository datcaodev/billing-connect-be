import { SERVICE_TYPE_CLIENT } from "../../enums/serviceType.enum";

export function getServiceTypeClientLabel(type: SERVICE_TYPE_CLIENT): string {
    switch (type) {
      case SERVICE_TYPE_CLIENT.ADMIN:
        return 'Admin';
      case SERVICE_TYPE_CLIENT.SELLER:
        return 'SELLER';
      case SERVICE_TYPE_CLIENT.CLIENT:
        return 'CLIENT';
      default:
        return 'Không xác định';
    }
  }