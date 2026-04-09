import { agencyService } from '../services/agency.service';
import { agencyRepository } from '../repositories/agency.repository';
import { ConflictError } from '../utils/errors/ConflictError.error';

jest.mock('../repositories/agency.repository');

describe('AgencyService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createAgency', () => {
        it('should create an agency successfully', async () => {
            const data = { code: 'AG01', email: 'test@example.com' };
            (agencyRepository.checkExistCode as jest.Mock).mockResolvedValue(false);
            (agencyRepository.checkExistEmail as jest.Mock).mockResolvedValue(false);
            (agencyRepository.createAgency as jest.Mock).mockResolvedValue(data);

            const result = await agencyService.createAgency(data as any);
            
            expect(result).toEqual(data);
            expect(agencyRepository.checkExistCode).toHaveBeenCalledWith('AG01');
            expect(agencyRepository.checkExistEmail).toHaveBeenCalledWith('test@example.com');
            expect(agencyRepository.createAgency).toHaveBeenCalledWith(data);
        });

        it('should throw ConflictError if code already exists', async () => {
            const data = { code: 'AG01' };
            (agencyRepository.checkExistCode as jest.Mock).mockResolvedValue(true);

            await expect(agencyService.createAgency(data as any)).rejects.toThrow(ConflictError);
            await expect(agencyService.createAgency(data as any)).rejects.toThrow('Mã đại lý đã tồn tại');
            
            expect(agencyRepository.checkExistCode).toHaveBeenCalledWith('AG01');
            expect(agencyRepository.createAgency).not.toHaveBeenCalled();
        });

        it('should throw ConflictError if email already exists', async () => {
            const data = { email: 'test@example.com' };
            (agencyRepository.checkExistEmail as jest.Mock).mockResolvedValue(true);

            await expect(agencyService.createAgency(data as any)).rejects.toThrow(ConflictError);
            await expect(agencyService.createAgency(data as any)).rejects.toThrow('Email đại lý đã tồn tại');
            
            expect(agencyRepository.checkExistEmail).toHaveBeenCalledWith('test@example.com');
            expect(agencyRepository.createAgency).not.toHaveBeenCalled();
        });

        it('should create agency if code and email are missing from data', async () => {
            const data = { name: 'Agency Name' };
            (agencyRepository.createAgency as jest.Mock).mockResolvedValue(data);

            const result = await agencyService.createAgency(data as any);
            
            expect(result).toEqual(data);
            expect(agencyRepository.checkExistCode).not.toHaveBeenCalled();
        });
    });

    describe('updateAgency', () => {
        const guid = 'test-guid';
        const existingAgency = { guid, email: 'old@example.com' };

        it('should update an agency successfully without email change', async () => {
            const data = { name: 'New Name' };
            (agencyRepository.findByGuid as jest.Mock).mockResolvedValue(existingAgency);
            (agencyRepository.updateAgency as jest.Mock).mockResolvedValue({ ...existingAgency, ...data });

            const result = await agencyService.updateAgency(guid, data as any);

            expect(result.name).toBe('New Name');
            expect(agencyRepository.checkExistEmailExcludeGuid).not.toHaveBeenCalled();
            expect(agencyRepository.updateAgency).toHaveBeenCalledWith(guid, data);
        });

        it('should update an agency successfully with unique new email', async () => {
            const data = { email: 'new@example.com' };
            (agencyRepository.findByGuid as jest.Mock).mockResolvedValue(existingAgency);
            (agencyRepository.checkExistEmailExcludeGuid as jest.Mock).mockResolvedValue(false);
            (agencyRepository.updateAgency as jest.Mock).mockResolvedValue({ ...existingAgency, ...data });

            const result = await agencyService.updateAgency(guid, data as any);

            expect(result.email).toBe('new@example.com');
            expect(agencyRepository.checkExistEmailExcludeGuid).toHaveBeenCalledWith('new@example.com', guid);
        });

        it('should throw ConflictError if updating to an existing email', async () => {
            const data = { email: 'existing@example.com' };
            (agencyRepository.findByGuid as jest.Mock).mockResolvedValue(existingAgency);
            (agencyRepository.checkExistEmailExcludeGuid as jest.Mock).mockResolvedValue(true);

            await expect(agencyService.updateAgency(guid, data as any)).rejects.toThrow('Email đại lý đã tồn tại');
        });

        it('should throw ConflictError if agency to update not found', async () => {
            (agencyRepository.findByGuid as jest.Mock).mockResolvedValue(null);

            await expect(agencyService.updateAgency(guid, {})).rejects.toThrow('Không tìm thấy đại lý');
        });
    });

    describe('deleteAgency', () => {
        const guid = 'test-guid';

        it('should delete an agency successfully', async () => {
            (agencyRepository.findByGuid as jest.Mock).mockResolvedValue({ guid });
            (agencyRepository.deleteAgency as jest.Mock).mockResolvedValue(undefined);

            const result = await agencyService.deleteAgency(guid);

            expect(result).toBe(true);
            expect(agencyRepository.deleteAgency).toHaveBeenCalledWith(guid);
        });

        it('should throw ConflictError if agency to delete not found', async () => {
            (agencyRepository.findByGuid as jest.Mock).mockResolvedValue(null);

            await expect(agencyService.deleteAgency(guid)).rejects.toThrow('Không tìm thấy đại lý');
        });
    });
});
