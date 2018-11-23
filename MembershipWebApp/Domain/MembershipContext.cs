using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MembershipWebApp.ViewModels;

namespace MembershipWebApp.Domain
{
    // To generate the initial schema. Go to CMD prompt in project root folder then run:
    // dotnet ef migrations add "Initial" -o "Domain\Migrations"

    // To apply changes run:
    // dotnet ef database update

    // To undo changes run:
    // dotnet ef migrations remove

    public class MembershipContext: DbContext
    {
        public MembershipContext(DbContextOptions<MembershipContext> options)
                : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Member>().ToTable("Members");
            modelBuilder.Entity<MemberAddress>().
                HasOne(p => p.Member).
                WithOne(q => q.MemberAddress).HasConstraintName("ForeignKey_MemberAddress_Member");

            modelBuilder.Entity<MemberDetails>().
                HasOne(p => p.Member).
                WithOne(q => q.MemberDetails).HasConstraintName("ForeignKey_MemberDetails_Member");
        }


        public DbSet<Member> Members { get; set; }
        public DbSet<MemberDetails> MemberDetails { get; set; }
        public DbSet<MemberAddress> MemberAddresses { get; set; }
    }
}
