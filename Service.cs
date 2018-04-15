using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace Sabio.Services
{
    public class EquipmentService : IEquipmentService
    {
        private IDataProvider _prov;

        public EquipmentService(IDataProvider provider)
        {
            _prov = provider;
        }

        public List<Equipment> Select()
        {
            List<Equipment> list = null;

            _prov.ExecuteCmd("dbo.Equipment_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    switch (set)
                    {
                        case 0:
                            Equipment x = MapEquipment(reader);

                            if (list == null)
                            {
                                list = new List<Equipment>();
                            }
                            list.Add(x);
                            break;
                    }
                }
                );
            return list;
        }

        public Equipment SelectById(int Id)
        {
            Equipment singleItem = null;

            _prov.ExecuteCmd("dbo.Equipment_SelectById",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    singleItem = MapEquipment(reader);
                }
                );
            return singleItem;
        }

        public int Insert(EquipmentAddRequest model)
        {
            int id = 0;

            _prov.ExecuteNonQuery("dbo.Equipment_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                 {
                     paramCollection.AddWithValue("@Name", model.Name);
                     paramCollection.AddWithValue("@EquipmentTypeId", model.EquipmentTypeId);
                     paramCollection.AddWithValue("@EquipmentStatusId", model.EquipmentStatusId);
                     paramCollection.AddWithValue("@Description", model.Description);
                     paramCollection.AddWithValue("@SerialNumber", model.SerialNumber);
                     paramCollection.AddWithValue("@UserId", model.UserId);

                     SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                     idParameter.Direction = System.Data.ParameterDirection.Output;

                     paramCollection.Add(idParameter);
                 },
                 returnParameters: delegate (SqlParameterCollection param)
                 {
                     id = (int)param["@Id"].Value;
                 }
                 );
            return id;
        }

        public int Update(EquipmentUpdateRequest model)
        {
            int id = 0;

            _prov.ExecuteNonQuery("dbo.Equipment_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", model.Id);
                    paramCollection.AddWithValue("@Name", model.Name);
                    paramCollection.AddWithValue("@EquipmentTypeId", model.EquipmentTypeId);
                    paramCollection.AddWithValue("@EquipmentStatusId", model.EquipmentStatusId);
                    paramCollection.AddWithValue("@Description", model.Description);
                    paramCollection.AddWithValue("@SerialNumber", model.SerialNumber);
                },
                returnParameters: delegate (SqlParameterCollection param)
                {
                    id = (int)param["@Id"].Value;
                }
                );
            return id;
        }

        public int Delete(int id)
        {
            int delete = 0;

            _prov.ExecuteNonQuery("dbo.Equipment_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                },
                returnParameters: delegate (SqlParameterCollection param)
                {
                    delete = (int)param["@Id"].Value;
                }
                );
            return delete;
        }

        private static Equipment MapEquipment(IDataReader reader)
        {
            Equipment singleItem = new Equipment();
            int startingIndex = 0;
            singleItem.Id = reader.GetSafeInt32(startingIndex++);
            singleItem.Name = reader.GetSafeString(startingIndex++);
            singleItem.EquipmentTypeId = reader.GetSafeInt32(startingIndex++);
            singleItem.EquipmentStatusId = reader.GetSafeInt32(startingIndex++);
            singleItem.Description = reader.GetSafeString(startingIndex++);
            singleItem.SerialNumber = reader.GetSafeString(startingIndex++);
            singleItem.UserId = reader.GetSafeInt32(startingIndex++);
            EquipmentType et = new EquipmentType();
            singleItem.EquipmentType = et;
            singleItem.EquipmentType.Id = reader.GetSafeInt32(startingIndex++);
            singleItem.EquipmentType.Name = reader.GetSafeString(startingIndex++);
            EquipmentStatus es = new EquipmentStatus();
            singleItem.EquipmentStatus = es;
            singleItem.EquipmentStatus.Id = reader.GetSafeInt32(startingIndex++);
            singleItem.EquipmentStatus.Name = reader.GetSafeString(startingIndex++);
            return singleItem;
        }

    }
}
