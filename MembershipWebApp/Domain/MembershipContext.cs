using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MembershipWebApp.ViewModels;

namespace MembershipWebApp.Domain
{
    // To generate the initial schema. Go to CMD prompt in project root folder then run:
    // dotnet ef migrations add "Initial" -o "Domain\Migrations"

    // To apply changes run:
    // dotnet ef database update

    // To undo changes run:
    // dotnet ef migrations remove

    public class MembershipContext: IdentityDbContext<ApplicationUser, ApplicationRole, int,      
        IdentityUserClaim<int>, ApplicationUserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>   //DbContext
    {
        public MembershipContext(DbContextOptions<MembershipContext> options)
                        : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");

            modelBuilder.Entity<ApplicationRole>().ToTable("Roles");

            modelBuilder.Entity<ApplicationUserRole>().ToTable("UserRoles");

            modelBuilder.Entity<ApplicationUser>().
                HasMany(p => p.Claims).
                    WithOne().
                    HasForeignKey(uc => uc.UserId).
                    IsRequired();

            modelBuilder.Entity<ApplicationUser>().
                    HasMany(p => p.Logins).
                    WithOne().
                    HasForeignKey(uc => uc.UserId).
                    IsRequired();

            modelBuilder.Entity<ApplicationUser>().
                HasMany(p => p.Tokens).
                    WithOne().
                    HasForeignKey(uc => uc.UserId).
                    IsRequired();

            modelBuilder.Entity<ApplicationUser>().
                HasMany(p => p.UserRoles).
                    WithOne().
                    HasForeignKey(uc => uc.UserId).
                    IsRequired();

            modelBuilder.Entity<ApplicationRole>().
                HasMany(e => e.UserRoles).
                    WithOne(e => e.Role).
                    HasForeignKey(ur => ur.RoleId).
                    IsRequired();

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
        //public DbSet<ApplicationUser> Users { get; set; }
        //public DbSet<ApplicationRole> Roles { get; set; }
        //public DbSet<ApplicationUserRole> UserRoles { get; set; }
    }
}
