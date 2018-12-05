* Access Control List
    * With respect to a computer file system - is a list of permissions attached to an object
    * An ACL specifies which users or system processes are granted access to objects as well as what operations are allowed on given objects
    * Each entry in a typical ACL specifies a subject and an operation
    * Networking ACLS
        * On some types of proprietary computer-hardware (routers and switches), an ACL provides rules that are applied to port numbers or IP addresses that are available on a host or other layer 3 each with a list of hosts and/or networks permitted to use the servicve
        * It is additionally possible to configure ACLs based on network domain names, this is a questionable idea because individual TCP, UDP, ICMP headers do not contain domain names
        * The device enforcing the ACL must separately surface for an attacker who is seeking to compromise security of the system which the ACL is protecting
        * Both individual servers as well as routers can have network ACLs
        * ACLs can generally be configured to both inbound and outbound traffic and in this context they are similar to firewalls
        * Like firewalls, ACLs could be subject to security regulations and standards such as PCI DSS
    * AWS Network ACLS
        * Optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets
        * You might set up network ACLs with rules similar to your security groups in order to add an additional layer of security to your VPC
* VPC
- VPC is a pool of on-demand resources that run on a public cloud. The resources are virtually isolated from different users of the same public cloud
- All machines can reach each other in a public cloud if no restrictive firewall rules are defined but in a VPC, only machines on the same VPC can reach each other 
* Encryption
* Classless Inter-Domain Routing (CIDR)
    * Method for allocating IP addresses and IP routing
* iptables
  * In a Unix-like server, the iptables program can be used to setup firewall rules
  * Standard firewall created in 1998 by Rusty Russell
  * It is included in most Linux distributions by default
  * Most of the explanation of iptables is not applicable for Windows or Mac OS
  * However because Redis will be running on a Linux server most of the time, it is important to understand how iptables can be used to improve the security around Redis
  * The iptables program should be executed by the root user
  * iptables defines the rules to govern the network traffic
  * The iptables program performs packet filtering with network rules
  * Different tables have multiple chains, and a chain is a group of rules that a packet is checked against sequentially
  * When a packet matches one of the existing rules in iptables, it will execute the associated action. The default table is the "filter" table
  * There are three built in chains for the filter table:
    - INPUT: This chain handles all packets that are addressed to your server
    - OUTPUT: This chain contains the rules for the traffic created by your server
    - FORWARD: This chain allows you to configure your server to route requests to other machines
  * Successor to iptables is nftables
  
  