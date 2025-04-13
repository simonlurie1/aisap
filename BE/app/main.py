import socket
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import dns.resolver
from typing import List, Dict, Any
import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

domain_lookups: List[Dict[str, Any]] = []

@app.get("/api/host-ip")
async def get_host_ip():
    # Get internal IP by Attempts to connect the socket to Google's public DNS
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        internal_ip = s.getsockname()[0]
    except Exception:
        internal_ip = '127.0.0.1'
    finally:
        s.close()


    public_ip = "Could not determine"

    try:
        response = requests.get('https://api.ipify.org', timeout=3)
        if response.status_code == 200:
            public_ip = response.text.strip()
    except Exception:
        pass

    return {"internal_ip": internal_ip, "public_ip": public_ip}

@app.get("/api/lookup/{domain}")
async def lookup_domain(domain: str):
    try:

        resolver = dns.resolver.Resolver()
        resolver.timeout = 5
        resolver.lifetime = 5

        # Use DNS resolver to get A records
        answers = resolver.resolve(domain, 'A')
        ips = [rdata.address for rdata in answers]

        lookup_result = {
            "domain": domain,
            "ips": ips
        }
        domain_lookups.append(lookup_result)

        return lookup_result
    except dns.resolver.Timeout:
        return {"error": f"DNS resolution timed out for {domain}"}
    except dns.resolver.NXDOMAIN:
        return {"error": f"Domain {domain} does not exist"}
    except dns.resolver.NoAnswer:
        return {"error": f"No DNS records found for {domain}"}
    except dns.exception.DNSException as dns_err:
        return {"error": f"DNS error: {str(dns_err)}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/history")
async def get_history():
    return domain_lookups