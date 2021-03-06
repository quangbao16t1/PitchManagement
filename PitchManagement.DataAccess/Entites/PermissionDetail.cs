using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class PermissionDetail
    {
        public int Id { get; set; }
        public int PermissionId { get; set; }
        [ForeignKey("PermissionId")]
        public virtual Permission Permission { get; set; }
        public int ActionCode { get; set; }
        public int ActionName { get; set; }
        public bool CheckAction { get; set; }
    }
}
